const axios = require('axios');
const { JSDOM } = require('jsdom');
const fs = require('fs');

(async () => {
    const searchTerm = encodeURIComponent('Budget Inn Anaheim near disneyland');
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const checkinDate = today.toISOString().split('T')[0];
    const checkoutDate = tomorrow.toISOString().split('T')[0];

    const url = `https://www.booking.com/searchresults.en-gb.html?ss=${searchTerm}&checkin=${checkinDate}&checkout=${checkoutDate}&group_adults=2&no_rooms=1&group_children=0&age=0`;
    console.log(`URL: ${url}`);

    const configs = {
        headers: {
            Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'Accept-Encoding': 'gzip, deflate, br, zstd',
            'Accept-Language': 'en-US,en;q=0.9',
            'Cache-Control': 'max-age=0',
            'Sec-Ch-Ua':
                '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
            'Sec-Ch-Ua-Mobile': '?0',
            'Sec-Ch-Ua-Platform': '"macOS"',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'none',
            'Sec-Fetch-User': '?1',
            'Upgrade-Insecure-Requests': '1',
            'User-Agent':
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
        },
    };

    try {
        const response = await axios.get(url, configs);
        fs.writeFileSync('bookingResponse.html', response.data, 'utf-8');

        const regex = /href="https:\/\/www\.booking\.com\/hotel([^"]*)"/;

        const hotel = response.data.match(regex)[0];
        /**
         * Find the most relevant result and access that page.
         */
        if (hotel.includes('href=')) {
            const { data } = await axios.get(
                hotel.replace('href="', ''),
                configs
            );

            /**
             * Get most relevant data using some simple regex expressions, after some research inside the result in booking response.
             */
            const response = {
                id: getHotelId(data),
                ufi: getDestId(data),
                countryCode: getCountryCode(hotel),
                pageName: getPageName(hotel),
                ...getAddress(data),
            };

            console.log(response);

            return response;
        }
        console.log('Booking response saved to bookingResponse.html');
    } catch (error) {
        console.error(error);
    }
})();

const getCountryCode = (html) => {
    return html.split('/')[4].trim() || '';
};
const getPageName = (html) => {
    return html.split('/')[5].split('.')[0] || '';
};

const getHotelId = (html) => {
    const inputRegex = /<input[^>]*name="hotel_id"[^>]*value="([^"]*)"/;

    const match = html.match(inputRegex);

    return match[1].trim().replace('\n') || '';
};

const getDestId = (html) => {
    const inputRegex = /<input[^>]*name="dest_id"[^>]*value="([^"]*)"/;

    const match = html.match(inputRegex);

    return match[1].trim().replace('\n') || '';
};

const getAddress = (html) => {
    const regex =
        /<span[^>]*\bclass="[^"]*\bhp_address_subtitle\b[^"]*\bjs-hp_address_subtitle\b[^"]*\bjq_tooltip\b[^"]*"[^>]*>([^<]+)<\/span>/;
    const match = html.match(regex);

    if (match[1]) {
        const address = match[1].trim().replace('\n');
        return {
            address,
            city: address.split(',')[1].trim().replace('\n'),
            country: address.split(',')[3].trim().replace('\n'),
        };
    }
    return {};
};
