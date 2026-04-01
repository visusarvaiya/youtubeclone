function Button({
    children,
    type="button",
    bgColor="bg-blue-600 dark:bg-blue-500",
    textColor="text-white dark:text-gray-50",
    className="",
    ...props
}) {
    return (
        <button type={type} className={`px-4 py-2 rounded-[50px] outline-none overflow-hidden font-semibold hover:opacity-90 transition-opacity ${bgColor} ${textColor} ${className}`} {...props}>
            {children}
        </button>
    )
}

export default Button