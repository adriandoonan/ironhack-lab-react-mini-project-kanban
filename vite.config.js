import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	//base: "/ironhack-lab-react-mini-project-kanban",
	optimizeDeps: {
		//exclude: ["@hello-pangea/dnd"],
	},
});
