import { Link } from "react-router-dom"


export const Header = (props) => {
    return (
        <div className="container">
            <nav className="header">
                <h1 className="headerText">My Notes</h1>
            </nav>
            <div className="leftsidebar">
                <Link to="/">
                    <div>Home</div>
                </Link>
            </div>
        </div>
    )
}