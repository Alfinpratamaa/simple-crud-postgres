import React from 'react'

const ToogleDarkMode = () => {
    return (
        <div><input type="checkbox" value="synthwave" className="toggle theme-controller bg-amber-300 border-sky-400 [--tglbg:theme(colors.sky.500)] checked:bg-blue-300 checked:border-blue-800 checked:[--tglbg:theme(colors.blue.900)] row-start-1 col-start-1 col-span-2" /></div>
    )
}

export default ToogleDarkMode