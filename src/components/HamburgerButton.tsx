import React from "react";
import { Button } from "@/components/ui/button";

const HamburgerButton = React.memo(({ onClick, isOpen }: { onClick: () => void; isOpen: boolean }) => (
    <Button onClick={onClick} className='block md:hidden'>
        <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            )}
        </svg>
    </Button>
));
HamburgerButton.displayName = "HamburgerButton";

export default HamburgerButton;