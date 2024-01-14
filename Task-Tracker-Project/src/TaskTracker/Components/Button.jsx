import PropTypes from 'prop-types'

// eslint-disable-next-line react/prop-types
export const Button = ({color,text,onClick}) => {
    return(
        <button onClick={onClick} className='btn' style={{backgroundColor:color}}>{text}</button>
    )
}

Button.defaultProps = {
    color:'steelblue',
    text: 'default-btn'
}

Button.PropTypes = {
    text: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}