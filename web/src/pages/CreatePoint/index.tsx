import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import './styles.css';
import logo from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Popup, Marker } from 'react-leaflet';

import { LeafletMouseEvent } from 'leaflet';
import { Item } from '../../types/item.interface';
import { State, City } from '../../types/ibge.interface';
import { getItemsAvailableToDisplay, saveNewPoint } from '../../services/point.service';
import { getAllProvinces, getCitiesByProvince } from '../../services/ibge.service';
import { AxiosResponse } from 'axios';

const CreatePoint = () => {
    const [position, setPosition] = useState<[number, number]>([0, 0]);
    const [items, setItems] = useState<Item[]>([]);
    const [states, setStates] = useState<State[]>([]);
    const [cities, setCities] = useState<City[]>([]);
    const [values, setValues] = useState<any>({ items: [] });
    const history = useHistory();

    const customChange = (e: ChangeEvent<any>) => {
        setValues({ ...values, [e.currentTarget.name]: e.currentTarget.value });
    }
    const addItem = (id: number) => {
        const alreadySelected = values.items.findIndex((i: number) => i === id);
        if (alreadySelected >= 0) {
            const newItems = values.items.filter((i: number) => i !== id);
            setValues({ ...values, items: newItems });
        } else {
            setValues({ ...values, items: [...values.items, id] });
        }
    }

    const handleMapClick = (e: LeafletMouseEvent) => {
        setPosition([e.latlng.lat, e.latlng.lng]);
    }

    const submitForm = async (e: FormEvent) => {
        e.preventDefault();
        saveNewPoint(values, position)
            .then(() => history.push('/'))
            .catch(ex => alert("Error to saved"));
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
            setPosition([
                pos.coords.latitude,
                pos.coords.longitude
            ]);
        });
    }, []);

    useEffect(() => {
        getItemsAvailableToDisplay()
            .then(({ data }: AxiosResponse<Item[]>) => {
                setItems(data);
            })
    }, []);

    useEffect(() => {
        getAllProvinces()
            .then(({ data }: AxiosResponse<State[]>) => {
                setStates(data);
            });
    }, []);

    useEffect(() => {
        if (values?.uf) {
            getCitiesByProvince(values.uf)
                .then(({ data }: AxiosResponse<City[]>) => {
                    setCities(data.map(city => ({
                        id: city.id,
                        nome: city.nome
                    })));
                });
        }
    }, [values?.uf]);

    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecollect" />
                <Link to="/">
                    <FiArrowLeft />
                    Back
                </Link>
            </header>
            <form onSubmit={submitForm}>
                <h1>Register point</h1>
                <fieldset>
                    <legend>
                        <h2>Information</h2>
                    </legend>
                    <div className="field">
                        <label htmlFor="name">Name</label>
                        <input onChange={customChange} type="text" name="name" id="name" />
                    </div>
                    <div className="field">
                        <label htmlFor="email">E-mail</label>
                        <input onChange={customChange} type="text" name="email" id="email" />
                    </div>
                    <div className="field">
                        <label htmlFor="whatsapp">WhatsApp</label>
                        <input onChange={customChange} type="text" name="whatsapp" id="whatsapp" />
                    </div>
                </fieldset>
                <fieldset>
                    <legend>
                        <h2>Address</h2>
                    </legend>
                    <Map zoom={13} center={position} onClick={handleMapClick}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={position}>
                            <Popup>
                                Point
                            </Popup>
                        </Marker>
                    </Map>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">State</label>
                            <select name="uf" id="uf" onChange={customChange}>
                                <option value="0">Select one</option>
                                {states.map(st => (
                                    <option key={st.id} value={st.sigla}>{st.sigla}</option>
                                ))}
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="city">City</label>
                            <select onChange={customChange} name="city" id="city">
                                <option>Select one city</option>
                                {cities.map(c => (
                                    <option key={c.id} value={c.nome}>{c.nome}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>
                        <h2>Collect Items</h2>
                        <span>Select one or more item bellow</span>
                    </legend>
                    <ul className="items-grid">
                        {items.map(item => (
                            <li key={item.id} onClick={() => addItem(item.id)}
                                className={values?.items?.includes(item.id) ? 'selected' : ''}>
                                <img src={item.image} alt="" />
                                <span>{item.title}</span>
                            </li>
                        ))}
                    </ul>
                </fieldset>
                <button type="submit" >Save</button>
            </form>
        </div>
    );
}

export default CreatePoint;