import { HeaderChildren } from "../types"

const Header: React.FC<HeaderChildren> = ({children})=> {
    return (
        <div>{children}</div>
    )
}

export default Header
