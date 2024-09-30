import React, { useEffect, useRef, useState } from 'react';
import { DockviewReact } from 'dockview';
import './App.css';
import Editor from './Editor';
import Chat from './Chat';
import TextBlock from './TextBlock';

function App() {
  /**
   * - TRY CORRECT DOCKVIEW-REACT import.
   * 
   * 
   * 
   * - improve "add".
   *    - panels to "activePanels"
   *    - currentPanels - "activePanelNames"
   *    - get starting panels based on names.
   *    - improve "getPanel" based on array
   * - move to "context".
   * - add "remove".
   * 
   * 
   * 
   * we need panels[] and components{ x: {}, y: {}} - they should be in state. As we need to change them later.
   * on load -> set main panels and components with what we need.
   * on button click -> change state.
   * 
   * We need to add/remove panels:
   * 
   * dockviewApi.current.addPanel(x-panel)
   * componens.add(x-component)
   * 
   * addPanel(key) - ex.addPanel(editorPanel)
   */
  const dockviewApi = useRef({});
  // Set starting components.
  const [panelComponents, setPenalComponents] = useState({
    editorPanel: () => <Editor />,
    chatPanel: () => <Chat />,
  });

  const panels = [
    {
      id: 'editor',
      component: 'editorPanel',
      title: 'Editor',
      position: {
        direction: 'left',
      },
    },
    {
      id: 'chat',
      component: 'chatPanel',
      title: 'Chat',
      position: {
        direction: 'right',
      },
    },
  ];

  useEffect(() => {
    console.log('panelComponents: ', panelComponents);

    const currentPanels = panels.map((item) => item.component);
    console.log('currentPanels: ', currentPanels);

    // If key does not have a panel, add the corresponding panel.
    for (const [key, value] of Object.entries(panelComponents)) {
      console.log('key: ', key);

      if (!currentPanels.includes(key)) {
        console.log(`"Event: ${key} is not in panels"`);

        const panel = getPanel(key);
        console.log('panel:  ', panel);

        dockviewApi.current.addPanel(panel);
      }
    }
  }, [panelComponents]);

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
    // Only update panel components.
    setPenalComponents((prevState) => {
      return {
        ...prevState,
        textBlock: () => <TextBlock />
      };
    });
  };

  return (
    <div className='App'>
      <div className='action-buttons'>
        <button onClick={handleAddPanel} className='btn'>Add panel</button>
      </div>
      
      <DockviewReact
        className='dockview-theme-light'
        components={panelComponents}
        onReady={(event) => {
          panels.forEach((panel) => {
            event.api.addPanel(panel);
          });

          dockviewApi.current = event.api;
        }}
      />
    </div>
  );
}

export default App;
