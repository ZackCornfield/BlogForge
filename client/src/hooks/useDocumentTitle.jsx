import { useEffect } from 'react';

function useDocumentTitle(title) {
    useEffect(() => {
        document.title = `BlogForge | ${title}`;
    }, [title])
}

export default useDocumentTitle;