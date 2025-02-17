import React from 'react';

const DefaultComponent = React.memo(({children}: { children: React.ReactNode }) => {
    return <>
        <section className="mt-8 text-slate-900 dark:text-slate-100 bg-slate-100 dark:bg-slate-900 p-6 rounded-3xl">
            {children}
        </section>
    </>;
});
DefaultComponent.displayName = 'StaticSection';

export default DefaultComponent;