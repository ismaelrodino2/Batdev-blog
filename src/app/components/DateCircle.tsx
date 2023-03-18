import { ReactNode } from 'react'

type Props = {
    children?: ReactNode
}
const DateCircle: React.FC<Props> = ({ children }) => (
    <div className="flex rounded-full h-[100px] text-accent items-center justify-center w-[100px] bg-white">
        {children}
    </div>
)

export default DateCircle
