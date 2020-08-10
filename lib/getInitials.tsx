const getInitials = (input: string) => {
    let initials = input.match(/\b\w/g) || [];
    // @ts-ignore
    initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase()
    return initials
}

export default getInitials
