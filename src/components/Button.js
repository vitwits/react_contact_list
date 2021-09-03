import React, { useState } from 'react';

function Button () {

    const [state, setState] = useState(['0']);
    console.log(useState());

    return (
        <div>
            <p>You clicked {state} times</p>
            <button onClick={() => setState(state + 55)}>Press</button>
        </div>
    )
}

export default Button;