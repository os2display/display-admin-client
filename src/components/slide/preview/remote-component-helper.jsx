import {
  createRemoteComponent,
  createRequires,
} from "@paciolan/remote-component";
import { resolve } from "../../../remote-component.config";

const requires = createRequires(resolve);
const RemoteComponent = createRemoteComponent({ requires });
export default RemoteComponent;
