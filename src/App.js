import React, { useEffect, useRef, useState } from 'react';
import { DockviewReact } from 'dockview';
import './App.css';
import Editor from './Editor';
import Chat from './Chat';
import TextBlock from './TextBlock';

function App() {
  /**
   * - read and commit
   *    - test if useEffect runs each time I update different state
   *    - activePanelsIds should be state.
   *    - after adding new panel - update activePanelsIds
   * 
   * 
   * - improve "add".
   *    - think about what should be in context?
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
    chatPanel: () => <Chat />
  });

  // For "Sidebar" we can use name "sidebarPanels".
  const panels = [
    {
      id: 'editorPanel',
      component: 'editorPanel',
      title: 'Editor',
      position: {
        direction: 'left'
      }
    },
    {
      id: 'chatPanel',
      component: 'chatPanel',
      title: 'Chat',
      position: {
        direction: 'right'
      }
    },
    {
      id: 'textBlockPanel',
      component: 'textBlockPanel',
      title: 'Text block',
      position: {
        direction: 'left'
      }
    }
  ];

  let activePanelsIds = ['editorPanel', 'chatPanel'];
  console.log('activePanelsIds: ', activePanelsIds);

  const activePanels = getPanels(activePanelsIds);

  useEffect(() => {
    console.log('panelComponents UPDATED: ', panelComponents);

    // If key does not have a panel, add the corresponding panel.
    for (const [key, value] of Object.entries(panelComponents)) {
      console.log('key: ', key);

      if (activePanelsIds.includes(key) === false) {
        console.log(`"Event: ${key} is not in panels. Add panel ${key}"`);

        const panel = getPanel(key);

        dockviewApi.current.addPanel(panel);
      }
    }
  }, [panelComponents]);

  function getPanel($id) {
    // console.log("getPanel(): ", $id);

    const item = panels.find((item) => {
      return item.id === $id;
    });
    console.log('getPanel() - found item: ', item);

    return item;
  }

  function getPanels($ids) {
    // console.log("getPanels(): ", $ids);

    const items = panels.filter((item) => {
      if ($ids.includes(item.id)) {
        return item;
      }
    });
    console.log('getPanels() - found items: ', items);

    return items;
  }

  const handleAddPanel = () => {
    // Only update panel components.
    setPenalComponents((prevState) => {
      return {
        ...prevState,
        textBlockPanel: () => <TextBlock />
      };
    });
  };

  return (
    <div className="App">
      <div className="action-buttons">
        <button onClick={handleAddPanel} className="btn">
          Add panel
        </button>
      </div>

      <DockviewReact
        className="dockview-theme-light"
        components={panelComponents}
        onReady={(event) => {
          activePanels.forEach((panel) => {
            event.api.addPanel(panel);
          });

          dockviewApi.current = event.api;
        }}
      />
    </div>
  );
}

export default App;
