import {MantineProvider} from "@mantine/core";
import {ModalsProvider} from "@mantine/modals";
import {theme} from "../shared";
import {DemoModal} from "../shared/modals";

function App() {

  return (
    <MantineProvider theme={theme}>
        <ModalsProvider>
            <DemoModal />
        </ModalsProvider>
    </MantineProvider>
  )
}

export default App
