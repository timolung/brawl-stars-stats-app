import { useState, useEffect } from 'react';

const useSharedState = (initialTag = '') => {
    const [isInitialLoad, setIsInitialLoad] = useState(true); 
    const [searchTag, setSearchTag] = useState('');
    const [formData, setFormData] = useState({
        // shared info
        currentTag: initialTag,
        name: '',

        // player info
        playerData: [],
        battleLogData: [],
        club: {},

        // club info
        clubData: {},
        clubMembers: [],
    });

    useEffect(() => {
        if (initialTag) {
        setFormData((prevData) => ({
            ...prevData,
            currentTag: initialTag,
        }));
        setIsInitialLoad(false);
        }
    }, [initialTag, isInitialLoad]);

    const handleSearch = () => {
        setFormData((prevData) => ({
        ...prevData,
        currentTag: searchTag,
        }));
        setIsInitialLoad(false);
    };

    return {
        searchTag,
        setSearchTag,
        isInitialLoad,
        formData,
        setFormData,
        handleSearch,
    };
};

export default useSharedState;
