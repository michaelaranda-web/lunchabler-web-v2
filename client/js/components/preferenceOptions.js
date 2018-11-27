import React from 'react';

export function PreferenceOptions(props) {
  return (
    <div className="preference-options">
      <i className={`far fa-grin-beam ${currentPreferenceClass(props.currentPreference, "yes")}`}
         onClick={() => props.onPreferenceClick("yes")}></i>
      <i className={`far fa-meh ${currentPreferenceClass(props.currentPreference, "meh")}`}
         onClick={() => props.onPreferenceClick("meh")}></i>
      <i className={`far fa-angry ${currentPreferenceClass(props.currentPreference, "no")}`}
         onClick={() => props.onPreferenceClick("no")}></i>
    </div>
  )
}

function currentPreferenceClass(currentPreference, preference) {
  return currentPreference === preference ? 'current-preference' : '';
}