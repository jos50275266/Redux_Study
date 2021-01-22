// import React, { Component } from 'react'
// import StoreContext from '../contexts/storeContext'
// import { loadBugs } from "../store/bugs"

// export default class Bugs extends Component {
//     static contextType = StoreContext;

//     state = { bugs: [] };

//     componentDidMount() {
//         // subscribe
//         // dispatch(loadBugs)
//         const store = this.context;

//         this.unsubscribe = store.subscribe(() => {
//             const bugsInStore = store.getState().entities.bugs.list;
//             if (this.state.bugs !== bugsInStore) this.setState({ bugs: bugsInStore });
//         });

//         store.dispatch(loadBugs());
//     }

//     componentWillUnmount() {
//         this.unsubscribe();
//     }

//     render() {
//         return (
//             <ul>
//                 {this.state.bugs.map(bug => <li key={bug.id}>{bug.description}</li>)}
//             </ul>
//         )
//     }
// }

import React, { Component } from 'react'
import { getUnresolvedBugs, loadBugs, resolveBug } from "../store/bugs"
import { connect } from 'react-redux';

class Bugs extends Component {

    componentDidMount() {
        this.props.loadBugs();
        console.log(this.props)
    }

    render() {
        return (
            <ul>
                {this.props.bugs.map(
                    bug => 
                    <li key={bug.id}>
                        {bug.description}
                        <button onClick={() => this.props.resolveBug(bug.id)}>Resolve</button>
                    </li>
                    )}
            </ul>
        )
    }
}

// bugs: state.entities.bugs.list

const mapStateToProps = state => ({
    bugs: getUnresolvedBugs(state)
})

const mapDispatchToProps = dispatch => ({
    loadBugs: () => dispatch(loadBugs()),
    resolveBug: id => dispatch(resolveBug(id))
})

// Container
//  Presentataion (Bugs)

export default connect(mapStateToProps, mapDispatchToProps)(Bugs);

// export default Bugs;