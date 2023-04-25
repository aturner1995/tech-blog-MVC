module.exports = {
    format_date: (date) => {
        // Format date as MM/DD/YYYY
        return date.toLocaleDateString();
    },

    eq: (option1, option2) => {
        console.log(option1,option2);
        return option1 == option2;
    }
}