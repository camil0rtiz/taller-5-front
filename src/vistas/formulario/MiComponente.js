import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios'
import { Container, Grid, Button, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Box } from '@material-ui/core';
import MaterialDatatable from "material-datatable"



const MiComponente = () => {
    // const [id, setId] = useState("")
    const [anio, setAnio] = useState("")
    const [patente, setPatente] = useState("")
    const [marca, setMarca] = useState("")
    const [marcas, setMarcas] = useState([])
    const [autos, setAutos] = useState([])

    const handleInputChangeAnio = (event) => {

        setAnio(event.target.value)
    }

    const handleInputChangePatente = (event) => {

        setPatente(event.target.value)

    }

    const handleChangeMarca = (event) => {

        setMarca(event.target.value)

    }


    // const handleInputChangeId = (event) => {

    //     setId(event.target.value)

    // }

    const enviarDatos = () => {

        guardarAuto();

        // editarPersona()

        // setId("")
        // setAnio("")
        // setPatente("")

    }

    useEffect(() => {

        getMarcas()

    }, [])

    useEffect(() => {

        getAutos()

    }, [])



    async function getMarcas() {
        try {
            const response = await axios.get('http://localhost:5000/api/marca');
            if (response.status === 200) {

                setMarcas(response.data.marca)
                //console.log(response.data);

            }
        } catch (error) {

            console.error(error);
        }
    }

    async function getAutos() {
        try {
            const response = await axios.get('http://localhost:5000/api/auto');
            if (response.status === 200) {

                response.data.autoconmarca.map((auto) => {
                    let nuevo = {
                        anio: auto.anio,
                        patente: auto.patente,
                        marca: auto.marca.descripcion

                    }

                    setAutos(autos => [...autos, nuevo])

                })




            }
        } catch (error) {

            console.error(error);
        }
    }

    // const editarPersona = async()=>{

    //     try {

    //         const response = await axios.put(`http://192.99.144.232:5000/api/personas/${ id }`,{
    //             nombre: nombre,
    //             apellido: apellido,
    //         });

    //         if(response.status === 200)
    //         {

    //             getPersonas();
    //           //console.log(response.data);
    //         }

    //     }catch (error) {
    //         console.error(error);
    //     }

    // }

    function guardarAuto() {
        axios.post('http://localhost:5000/api/auto', {
            anio: anio,
            patente: patente,
            idMarca: marca
        })
            .then(function (response) {

                if (response.status === 200) {
                    //alert("Registro correcto")
                    getAutos()

                } else {
                    alert("Error al guardar")
                }

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const columns = [
        {
            name: "Marca",
            field: "marca",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Patente",
            field: "patente",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "Anio",
            field: "anio",
            options: {
                filter: true,
                sort: false,
            }
        },
    ];

    const handleRowClick = (rowData, rowMeta) => {

        // setId(rowData._id);
        setAnio(rowData.anio)
        setPatente(rowData.patente)
        setMarca(rowData.marca)

    };

    const options = {
        filterType: 'checkbox',
        onlyOneRowCanBeSelected: true,
        onRowClick: handleRowClick
    };

    return (

        <Container maxWidth="md">
            <Grid container spacing={2}>
                <Grid item xs={12} md={12} style={{ padding: 20 }}>
                    <Typography variant="h6">
                        Ingrese autos
                    </Typography>
                </Grid>
                {/* <input type="hidden" placeholder="Nombre" name="nombre" onChange={handleInputChangeId} value={id}></input> */}
                <Grid item xs={12} md={6} style={{ padding: 20 }} fullWidth>
                    <TextField id="anio" label="Año" variant="outlined" onChange={handleInputChangeAnio} value={anio} fullWidth />
                </Grid>
                <Grid item xs={12} md={6} style={{ padding: 20 }}>
                    <TextField id="patente" label="Patente" variant="outlined" onChange={handleInputChangePatente} value={patente} fullWidth />
                </Grid>
                <Grid item xs={12} md={12} style={{ padding: 20 }}>
                <FormControl variant="outlined" fullWidth>
                    <InputLabel id="demo-simple-select-outlined-label">Marca</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={marca}
                        label="Marca"
                        onChange={handleChangeMarca}
                    >
                        <MenuItem value="">
                            <em>Ningúno</em>
                        </MenuItem>
                        {marcas.map((marca) => (
                            <MenuItem value={marca._id}>{marca.descripcion}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                </Grid>
                <Grid item xs={12} md={2} style={{ padding: 20 }}>
                    <Button variant="contained" color="primary" onClick={enviarDatos} fullWidth>Guardar</Button>
                </Grid>
                {/* <Grid item xs={12} md={2}>
                <Button variant="contained" color="secondary" disabled={ id === "" ? true: false} onClick={eliminarDatos} fullWidth >Eliminar</Button>
            </Grid> */}
            </Grid>

            <Grid item xs={12} md={12} className="table" style={{ padding: 20 }}>
                <MaterialDatatable
                    title={"Listado de autos"}
                    data={autos}
                    columns={columns}
                    options={options}
                />
            </Grid>

        </Container>


    )

}

export default MiComponente

