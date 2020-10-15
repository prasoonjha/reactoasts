import React, { useState } from 'react'

import Toast from 'reactoasts'

const App = () => {
  const [type, setType] = useState('success');
  return <div style={{"padding":"2em 4em", color:"#fff"}}>
    <select value={type} onChange={(e)=>{setType(e.target.value)}} >
      <option value='success'>Success</option>
      <option value='error'>Error</option>
      <option value='warning'>Warning</option>
      <option value='info'>Info</option>
    </select>
    <button onClick={()=>Toast({
            position: 'topLeft',
            type: type,
            text: 'created successfully'
        })}>Toast {type} top left</button>
        <button onClick={()=>Toast({
            position: 'topRight',
            type: type,
            text: 'created successfully'
        })}>Toast {type} top right</button>
        <button onClick={()=>Toast({
            position: 'bottomRight',
            type: type,
            text: 'created successfully'
        })}>Toast {type} bottom right</button>
        <button onClick={()=>Toast({
            position: 'bottomLeft',
            type: type,
            text: 'created successfully'
        })}>Toast {type} bottom leftt</button>
        <div>
          <p>yarn add neo-toast</p>
          <code style={{"backgroundColor": "rgba(3, 169, 244, 0.3)",
          "display": "block", "padding": "2em", "borderRadius": "4px"}}>
            <br />
            <br />
            import Toast from 'neo-toast'
            <br />
            <br />
          <b>
<pre>
{`<button
  onClick={Toast({
    position: 'topLeft',
    type: ${type},
    text: 'created successfully'
  })>Toast ${type}
</button>`}
</pre>
          </b>

          </code>
        </div>
  </div>
}

export default App