import React, {useEffect} from "react";

export let SceneComponent = (props: any) => {
    useEffect( () => {
        console.log(" -- MAIN scene loaded -- ")
        const { id } = props
    }, [])
    return (
        <div className="scene-container">
            <canvas id=""></canvas>
        </div>
    )
}