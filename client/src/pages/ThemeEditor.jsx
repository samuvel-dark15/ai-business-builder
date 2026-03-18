import { useState } from "react";
import api from "../api";

export default function ThemeEditor({site}){

const [primary,setPrimary] = useState(site.theme.primary);
const [secondary,setSecondary] = useState(site.theme.secondary);
const [font,setFont] = useState(site.theme.font);

const saveTheme = async () => {

 await api.put(`/api/site/${site._id}`,{
   theme:{primary,secondary,font}
 });

 alert("Theme updated");

};

return(

<div>

<h2>Theme Editor</h2>

<label>Primary Color</label>
<input type="color" value={primary} onChange={e=>setPrimary(e.target.value)} />

<label>Secondary Color</label>
<input type="color" value={secondary} onChange={e=>setSecondary(e.target.value)} />

<label>Font</label>
<select value={font} onChange={e=>setFont(e.target.value)}>
<option>Poppins</option>
<option>Inter</option>
<option>Roboto</option>
</select>

<button onClick={saveTheme}>Save Theme</button>

</div>

);

}