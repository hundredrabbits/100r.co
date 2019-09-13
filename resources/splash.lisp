; template for the hundred rabbits videos end screen
(clear)
(resize 1280 800)
(def import-path $path)
(def export-path 
  (concat 
    (dirpath import-path) "/" 
    (filename import-path) "-export.jpg"))
(fill frame "white")
(import import-path 
  (guide 
    (circle frame:c frame:m 375)))
(fill 
  (text 
    (frame:c) 
    (mul frame:m 1.6) "bold 45" "Support us on Patreon" "center" "Alte Haas Grotesk") "black")
(export export-path)
(exit true)