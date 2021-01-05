[react-mapbox-ui](../README.md) / [Exports](../modules.md) / Listener

# Interface: Listener<T\>

## Type parameters

Name | Type | Default |
------ | ------ | ------ |
`T` | keyof MapEventType | *any* |

## Hierarchy

* **Listener**

## Callable

▸ **Listener**(`listener`: (`ev`: MapEventType[T] & EventData) => *void*): *void*

#### Parameters:

Name | Type |
------ | ------ |
`listener` | (`ev`: MapEventType[T] & EventData) => *void* |

**Returns:** *void*

Defined in: MapboxUI.tsx:14

▸ **Listener**(`listener`: (`ev`: *any*) => *void*): *void*

#### Parameters:

Name | Type |
------ | ------ |
`listener` | (`ev`: *any*) => *void* |

**Returns:** *void*

Defined in: MapboxUI.tsx:15