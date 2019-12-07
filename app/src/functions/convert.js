export function convertVND (data) {
        const string = data.toString();
        const length = string.length;
        var convert = '';
        var count = 1;
        for (i = length - 1; i >= 0; i--) {
                if (count == 3 && i != 0) {
                        let char = string.charAt(i);
                        convert = '.'.concat(char, convert);
                        count = 1;
                } else {
                        let char = string.charAt(i);
                        convert = char.concat('', convert);
                        count = count + 1;
                }
        }
        return convert;
}

export function convertPhoneNumber (data) {
        const string = data.toString();
        const length = string.length;
        var convert = '';
        for (let i = 0; i < length; i++) {
                let char = string.charAt(i);
                if (char === '+') {
                        let slice = string.slice(3, length);
                        convert = '0'.concat(slice);
                        break;
                } else if (char === '-') {
                        convert = string.replace(/-/g, '');
                        break;
                } else {
                        convert = string;
                }
        }
        return convert;
}

export function convertDate (date) {
        return `${date.getDate()} / ${date.getMonth()} / ${date.getFullYear()}`;
}



