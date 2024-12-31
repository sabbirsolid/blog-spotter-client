import { Link } from "react-router-dom";

const Error = () => {
    return (
        <div>
            <h1 className='font-bold text-center to-amber-600 text-5xl'>Not found</h1>
            <Link to='/'><button>Go to Home</button></Link>
        </div>
    );
};

export default Error;