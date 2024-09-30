import React, { useEffect, useRef, useState } from 'react';
import { DockviewReact } from 'dockview';
import './App.css';
import Editor from './Editor';
import TextBlock from './TextBlock';

function App() {
  /**
   * - add git!
   * - add better styles and clean.
   * - TRY CORRECT DOCKVIEW-REACT import.
   * - look again what I did.
   * - improve "add".
   * - add "remove".
   * - move to "context".
   * 
   * 
   * we need panels[] and components{ x: {}, y: {}} - they should be in state. As we need to change them later.
   * on load -> set main panels and components with what we need.
   * on button click -> change state.
   * 
   * move to Context.
   *
   * We need to add/remove panels:
   * 
   * dockviewApi.current.addPanel(x-panel)
   * componens.add(x-component)
   * 
   * addPanel(key) - ex.addPanel(editorPanel)
   */

  const dockviewApi = useRef({});
  const [dockviewComponents, setDockviewComponents] = useState({
    editorPanel: () => <Editor />,
  });

  const panels = [
    {
      id: 'panel_1',
      component: 'editorPanel',
      title: 'Editor',
      position: {
        direction: 'left',
      },
    },
    {
      id: 'panel_2',
      component: 'editorPanel',
      title: 'Chat',
      position: {
        direction: 'right',
      },
    },
  ];

  useEffect(() => {
    console.log('dockviewComponents: ', dockviewComponents);

    const currentPanels = panels.map((item) => item.component);
    console.log('currentPanels: ', currentPanels);

    // If componentKey does not have a panel, add the corresponding panel.
    for (const [componentKey, value] of Object.entries(dockviewComponents)) {
      console.log('componentKey:  ', componentKey);

      if (!currentPanels.includes(componentKey)) {
        console.log(`${componentKey} is not in panels`);

        const panel = getPanel(componentKey);
        console.log('panel:  ', panel);

        dockviewApi.current.addPanel(panel);
      }
    }
  }, [dockviewComponents]);

  const getPanel = ($component) => {
    switch ($component) {
      case 'textBlock':
        return {
          id: 'panel_3',
          component: 'textBlock',
          title: 'Text block',
          position: {
            direction: 'left',
          }
        }
      case 'Mangoes':
      case 'Papayas':
      default:
    }
  };

  const handleAddPanel = () => {
    setDockviewComponents((prevState) => {
      return {
        ...prevState,
        textBlock: () => <TextBlock />,
      };
    });
  };

  return (
    <div className='App'>
      <button onClick={handleAddPanel}>Add panel</button>

      <DockviewReact
        className='dockview-theme-light'
        components={dockviewComponents}
        onReady={(event) => {
          panels.forEach((panel) => {
            event.api.addPanel(panel);
          });

          dockviewApi.current = event.api;
          // event.api.addPanel();
          // event.api.addPanel({ id: 'panel_2', component: 'editorPanel' });
          // event.api.panels[0].update({ title: 'Max' });
          // event.api.panels[0].api.setTitle('bb');
          // console.log(event.api.panels);
        }}
      />
    </div>
  );
}

export default App;
