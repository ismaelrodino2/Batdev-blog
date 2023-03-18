import type { NextPage } from 'next'

import { useEffect, useState } from 'react'
import { MdOutlineKeyboardArrowUp } from 'react-icons/md/index'

const GoTop: NextPage = () => {
    const [visible, setVisible] = useState<boolean>(false)

    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setVisible(true)
        } else {
            setVisible(false)
        }
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility)

        return () => {
            window.removeEventListener('scroll', toggleVisibility)
        }
    }, [])

    return (
        <button
            className={`bg-[rgba(0,0,0,0.39607843137255)] fixed bottom-5 right-5 w-[46px] h-[46px] flex justify-center items-center text-2xl transition-all duration-300 ease-in-out hover:bg-primary-medium  text-white  ${
                visible ? 'opacity-100' : 'opacity-0'
            } `}
            onClick={scrollToTop}
        >
            <MdOutlineKeyboardArrowUp />
        </button>
    )
}

export default GoTop
