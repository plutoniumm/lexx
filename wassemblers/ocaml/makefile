build:
	dune clean;
	dune build;
	rm -f ./static/ocaml.js;
	cp _build/default/bin/toplevel.bc.js static/ocaml.js;

dev:
	cd static && python3 -m http.server 8000;

copy:
	rm -rf ../../templates/ocaml;
	cp -r ./static ../../templates/ocaml;