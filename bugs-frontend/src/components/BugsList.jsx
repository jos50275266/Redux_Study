import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { loadBugs, getUnresolvedBugs, resolveBug } from '../store/bugs';

const BugsList = () => {

    const dispatch = useDispatch();
    // useSelector(state => state.entities.bugs.list);
    const bugs = useSelector(getUnresolvedBugs);

    useEffect(() => {
        dispatch(loadBugs());
    }, []);

    return (
        <ul>
            {bugs.map(
                bug => 
                <React.Fragment>
                    <li key={bug.id}>
                        {bug.description}
                    </li>
                    <button onClick={() => dispatch(resolveBug(bug.id))}>Click</button>
                </React.Fragment>
            )}
        </ul>
    )
}

export default BugsList;