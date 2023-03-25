import { Link } from "react-router-dom"


export const Header = (props) => {
    return (
        <div className="container">
            <nav className="header">
                <strong>My Notes</strong>
            </nav>
            <div className="leftsidebar">
                <Link to="/">
                    <div>Home</div>
                </Link>
            </div>
        </div>
    )
}