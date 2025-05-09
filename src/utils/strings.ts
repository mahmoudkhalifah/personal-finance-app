export const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatAmount = (amount: number): string => {
    const [integer, decimal] = amount.toFixed(2).toString().split('.');
    const withCommas = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return decimal !== '00' ? `${withCommas}.${decimal}` : withCommas;
};
