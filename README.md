# ValidationPlatform
CFS data validation platform
Application Diagram

graph LR
 subgraph Data & Configuration
  A(Configuration File)
  C(Lookup Tables) 
  E(Error Flags)
end
subgraph Common Functions
  B[Field & Range Validation Functions]
  D[Lookup & Cross Consistency Functions]
end 
subgraph Attribute Specific Functions
  F{Integration}
end 
  A -->B
  C--> D
  E -->F
  B --> F
  D -->F
