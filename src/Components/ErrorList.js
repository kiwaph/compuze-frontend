export const ErrorList = ({errors}) => {
    return (
        <div className='validation-error'>
            {errors.map((error, index) => <p key={index}>{error.msg}</p>)}
        </div>
    )
}