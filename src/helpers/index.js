const helper = {
    //Function handle money (use to page Cart)
    formatProductPrice: (giaban) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(giaban);
    },
};

export default helper;
