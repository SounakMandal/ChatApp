import React, { useCallback } from 'react';

import dagre from 'dagre';
import ReactFlow, {
  ConnectionLineType,
  Edge,
  Node,
  Panel,
  Position,
  addEdge,
  useEdgesState,
  useNodesState
} from 'reactflow';

import 'reactflow/dist/style.css';
import { Button } from '../ui/button';

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 36;

const getLayoutedElements = (nodes: Node[], edges: Edge[], direction = 'TB') => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? Position.Left : Position.Top;
    node.sourcePosition = isHorizontal ? Position.Right : Position.Bottom;

    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};

interface FlowProps {
  titles: string;
  subtitles: string[];
}

export default function Flow({ titles, subtitles }: FlowProps) {
  const initialNodes: Node<ChatGroupData, "chat_group">[] = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: titles } },
    { id: '2', position: { x: 0, y: 50 }, data: { label: subtitles[0] } },
    { id: '3', position: { x: 0, y: 100 }, data: { label: subtitles[1] } },
  ];
  const initialEdges = [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e1-3', source: '1', target: '3' }
  ];

  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
    initialNodes,
    initialEdges
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  const onConnect = useCallback((params: any) => setEdges((eds) =>
    addEdge({ ...params, type: ConnectionLineType.SmoothStep, animated: true }, eds)
  ), []);

  const onLayout = useCallback((direction: string) => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      nodes,
      edges,
      direction
    );

    setNodes([...layoutedNodes]);
    setEdges([...layoutedEdges]);
  }, [nodes, edges]);

  return (
    <div style={ { width: '70vw', height: '70vh' } }>
      <ReactFlow
        nodes={ nodes }
        edges={ edges }
        onNodesChange={ onNodesChange }
        onEdgesChange={ onEdgesChange }
        onConnect={ onConnect }
        connectionLineType={ ConnectionLineType.SmoothStep }
        fitView
      >
        <Panel position="top-right">
          <div className='flex flex-col gap-2'>
            <Button onClick={ () => onLayout('TB') }>vertical layout</Button>
            <Button onClick={ () => onLayout('LR') }>horizontal layout</Button>
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
}
