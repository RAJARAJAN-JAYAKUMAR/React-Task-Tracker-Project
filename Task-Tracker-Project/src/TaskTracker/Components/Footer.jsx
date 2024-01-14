import { Link } from 'react-router-dom'

function Footer() {
    return(
        <footer>
            <p>Copyright &copy;2024</p>
            {/* <a href="/about">About</a> */}
            <Link to='/about'> Go back</Link>

        </footer>
    )
}

export default Footer