import React, {useState} from 'react'

const Foco = (props) => {

    const [estatus, setEstatus] = useState(false)

    const switchEstatus = () => {
        setEstatus(estatus => !estatus)
    }

    return (
        <div>
            <img src = { estatus ? "images/focoOn.png" : "images/focoOff.png" }
                onClick={switchEstatus}
                alt="Foco"

            />
            <p>
                {props.lugar}
            </p>
        </div>
    )
}

export default Foco