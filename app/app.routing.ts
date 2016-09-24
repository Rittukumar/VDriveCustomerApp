import { LoginComponent } from "./pages/login/login.component";
import { ListComponent } from "./pages/list/list.component";
import { VdriveComponent } from "./pages/vdrive/vdrive.component";

export const routes = [
  { path: "", component: LoginComponent },
  { path: "list", component: ListComponent },
  { path: "vdrive", component: VdriveComponent },
  { path: "login", component: LoginComponent }
];

export const navigatableComponents = [
  LoginComponent,
  ListComponent,
  VdriveComponent
];
