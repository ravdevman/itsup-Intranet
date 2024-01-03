import { useRouteError } from "react-router-dom";
import './error-page.css'
import Modal from "../../components/containers/Modal/Modal";
import Logo from '../../assets/logo.png'

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
	<Modal >
		<div id="error-page">
			<img src={Logo} className="logo-modal" />
			<h1>Oops!</h1>
			<p>Sorry, an unexpected error has occurred.</p>
			<p>
				<i>{error.statusText || error.message}</i>
			</p>
		</div>
	</Modal>
  );
}