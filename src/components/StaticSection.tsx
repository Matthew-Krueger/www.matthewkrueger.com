import React from 'react';
import {cn} from "@/lib/utils";

const DefaultComponent = React.memo(({children, className}: { children: React.ReactNode, className?: string }) => {
    return <>
        <section className={cn(
            "mt-8 text-slate-900 dark:text-slate-100 bg-slate-100 dark:bg-slate-900 p-6 rounded-3xl shadow-lg",
            className
        )}>
            {children}
        </section>
    </>;
});
DefaultComponent.displayName = 'StaticSection';

export default DefaultComponent;