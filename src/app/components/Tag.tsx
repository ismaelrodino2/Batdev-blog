import { ReactNode } from 'react'

type Props = {
    children?: ReactNode
}
const Tag: React.FC<Props> = ({ children }) => (
    <div className="bg-secondary  h-[46px] w-full flex justify-center items-center">
        <h6 className="text-[white]">{children}</h6>
    </div>
)

export default Tag
