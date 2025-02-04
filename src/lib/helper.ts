export const formatRupiah = (value: number) => {
    if (!value) return "";
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(value);
};

export const formatNumber = (value: number) => {
    if (!value) return "";
    return new Intl.NumberFormat("id-ID").format(value);
};