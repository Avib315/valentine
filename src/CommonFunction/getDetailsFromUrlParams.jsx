
export const getDetailsFromUrlParams = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const name = searchParams.get('name');
    const time = searchParams.get('time');
    const gender = searchParams.get('gender');

    const isValidName = name && name.trim().length > 0;
    const isValidTime = time && /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time);
    const isValidGender = gender && ['male', 'female'].includes(gender.toLowerCase());

    return {
        name: isValidName ? decodeURIComponent(name) : null,
        time: isValidTime ? time : null,
        gender: isValidGender ? gender.toLowerCase() : null,
        isValid: isValidName && isValidTime && isValidGender
    };
};


export const createInviteUrl = (details) => {
    const { name, time, gender } = details;
    const params = new URLSearchParams();
    
    if (name) params.set('name', encodeURIComponent(name));
    if (time) params.set('time', time);
    if (gender) params.set('gender', gender.toLowerCase());
    

    const baseUrl = window.location.href.split('?')[0];
    return `${baseUrl}?${params.toString()}`;
};