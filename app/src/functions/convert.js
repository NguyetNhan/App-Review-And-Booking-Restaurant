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



