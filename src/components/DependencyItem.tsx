import React from 'react';
import {Dependency} from "@/lib/types";

const DependencyItem = React.memo(({ name, url, version, license, heading}: Dependency) => (
    <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-50 hover:bg-slate-300 dark:hover:bg-slate-700 active:bg-slate-400 dark:active:bg-slate-600 px-6 py-3 rounded-md shadow-md flex flex-col items-center text-center transition"
    >
        {heading && <span className="font-bold">{heading}</span>}
        <span className="font-bold">{name}</span>
        {version && <span className="text-sm">Version {version}</span>}
        {license && <span className="text-xs mt-1">{license}</span>}
    </a>
));
DependencyItem.displayName = "DependencyItem";

export default DependencyItem;