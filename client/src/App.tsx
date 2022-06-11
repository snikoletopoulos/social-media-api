import { Route, Routes } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./App.module.css";

import Posts from "pages/Posts/Posts";
import Profile from "pages/Profile/Profile";
import Signup from "pages/Signup/Signup";
import Signin from "pages/Signin/Signin";

const App: React.FC = () => {
	return (
		<div className={styles.App}>
			<Routes>
				<Route path="/posts" element={<Posts />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/signin" element={<Signin />} />
				<Route path="/profile/:id" element={<Profile />} />
			</Routes>
		</div>
	);
};

export default App;
