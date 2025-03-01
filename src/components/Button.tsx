import '../styles/button.css'

interface ButtonProps{
    children:string,
    itemKey:number,
    classname : string,
    onClick: (value:number) => void
}
function Button({ children, itemKey, onClick ,classname }: ButtonProps) {

    return (
        
            <button className={classname} value={itemKey} key={itemKey} onClick={() => onClick(itemKey)} >
                {children}
            </button>
        
    )
}

export default Button

